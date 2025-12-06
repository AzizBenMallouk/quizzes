<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\Organisation;
use App\Entity\User;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

class OrganisationTest extends ApiTestCase
{
    // use RefreshDatabaseTrait; // Disabled because we are using the main DB for now or need config

    public function testGetCollection(): void
    {
        // The client may need authentication if we secured the API
        // For now assuming public read or we'll see 401
        $response = static::createClient()->request('GET', '/api/organisations');

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains(['@context' => '/api/contexts/Organisation']);
    }

    public function testCreateOrganisation(): void
    {
        $response = static::createClient()->request('POST', '/api/organisations', [
            'json' => [
                'name' => 'New Test Org',
                'createdDate' => '2023-01-01T00:00:00+00:00',
                'status' => 'active'
            ]
        ]);

        $this->assertResponseStatusCodeSame(201);
        $this->assertJsonContains([
            '@context' => '/api/contexts/Organisation',
            '@type' => 'Organisation',
            'name' => 'New Test Org',
            'status' => 'active'
        ]);
    }
}
