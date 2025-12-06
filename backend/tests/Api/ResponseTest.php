<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

class ResponseTest extends ApiTestCase
{
    public function testGetResponses(): void
    {
        static::createClient()->request('GET', '/api/responses');

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains(['@context' => '/api/contexts/Response']);
    }
}
