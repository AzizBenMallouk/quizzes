<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

class QuestionTest extends ApiTestCase
{
    public function testGetQuestions(): void
    {
        static::createClient()->request('GET', '/api/questions');

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains(['@context' => '/api/contexts/Question']);
    }
}
