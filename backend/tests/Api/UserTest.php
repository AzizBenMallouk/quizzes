<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

class UserTest extends ApiTestCase
{
    public function testGetUsers(): void
    {
        static::createClient()->request('GET', '/api/users');

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains(['@context' => '/api/contexts/User']);
    }

    public function testGetUser(): void
    {
        // Assuming fixture loaded at least one user with ID 1 (admin usually)
        // We might need to look up an ID if we want to be robust, but for now try ID 1
        // Or better, get the collection and pick one.
        $client = static::createClient();
        $response = $client->request('GET', '/api/users');
        $data = $response->toArray();

        // API Platform might return 'member' or 'hydra:member' depending on format
        $members = $data['hydra:member'] ?? $data['member'] ?? [];

        if (count($members) > 0) {
            $iri = $members[0]['@id'];
            $client->request('GET', $iri);
            $this->assertResponseIsSuccessful();
        } else {
            $this->fail('No users found in the collection. Response: ' . json_encode($data));
        }
    }
}
