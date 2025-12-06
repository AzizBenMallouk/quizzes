<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

class ResultTest extends ApiTestCase
{
    public function testGetResults(): void
    {
        static::createClient()->request('GET', '/api/results');

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains(['@context' => '/api/contexts/Result']);
    }
}
