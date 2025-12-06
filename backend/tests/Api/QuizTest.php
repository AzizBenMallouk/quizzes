<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

class QuizTest extends ApiTestCase
{
    public function testGetQuizzes(): void
    {
        static::createClient()->request('GET', '/api/quizzes');

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains(['@context' => '/api/contexts/Quiz']);
    }
}
