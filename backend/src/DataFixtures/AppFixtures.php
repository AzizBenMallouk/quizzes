<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Organisation;
use App\Entity\Question;
use App\Entity\Quiz;
use App\Entity\Response;
use App\Entity\Result;
use App\Entity\ResultDetail;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        // 1. Organisations
        $organisations = [];
        for ($i = 0; $i < 5; $i++) {
            $org = new Organisation();
            $org->setName($faker->company);
            $org->setCreatedDate(\DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-1 year', 'now')));
            $org->setStatus($faker->randomElement(['active', 'inactive']));
            $manager->persist($org);
            $organisations[] = $org;
        }

        // 2. Users
        $users = [];
        // Admin
        $admin = new User();
        $admin->setUsername('admin');
        $admin->setEmail('admin@example.com');
        $admin->setFirstName('Admin');
        $admin->setLastName('User');
        $admin->setRoles(['ROLE_ADMIN']);
        $admin->setPassword($this->passwordHasher->hashPassword($admin, 'password'));
        $manager->persist($admin);
        $users[] = $admin;

        // Managers and Students
        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $user->setUsername($faker->userName);
            $user->setEmail($faker->email);
            $user->setFirstName($faker->firstName);
            $user->setLastName($faker->lastName);

            $role = $faker->randomElement(['ROLE_ORG_MANAGER', 'ROLE_STUDENT']);
            $user->setRoles([$role]);
            $user->setPassword($this->passwordHasher->hashPassword($user, 'password'));

            $user->setOrganisation($faker->randomElement($organisations));

            $manager->persist($user);
            $users[] = $user;
        }

        // 3. Categories
        $categories = [];
        for ($i = 0; $i < 5; $i++) {
            $category = new Category();
            $category->setName($faker->word);
            // Assign to some organisations
            $category->addOrganisation($faker->randomElement($organisations));
            $manager->persist($category);
            $categories[] = $category;
        }

        // 4. Quizzes
        $quizzes = [];
        foreach ($categories as $category) {
            for ($j = 0; $j < 2; $j++) { // 2 quizzes per category
                $quiz = new Quiz();
                $quiz->setTitle($faker->sentence(3));
                $quiz->setCategory($category);
                $manager->persist($quiz);
                $quizzes[] = $quiz;

                // 5. Questions
                for ($k = 0; $k < 5; $k++) { // 5 questions per quiz
                    $question = new Question();
                    $question->setDescription($faker->paragraph);
                    $question->setPoints($faker->numberBetween(1, 10));
                    $question->setQuiz($quiz);
                    $manager->persist($question);

                    // 6. Responses
                    for ($l = 0; $l < 4; $l++) { // 4 responses per question
                        $response = new Response();
                        $response->setDescription($faker->sentence);
                        $response->setIsCorrect($l === 0); // First one is correct
                        $response->setQuestion($question);
                        $manager->persist($response);
                    }
                }
            }
        }

        $manager->flush();
    }
}
