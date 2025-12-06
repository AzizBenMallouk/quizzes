<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ApiResource]
class ResultDetail
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'details')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Result $result = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Question $question = null;

    #[ORM\ManyToOne]
    private ?Response $selectedResponse = null;

    #[ORM\Column]
    private ?bool $isCorrect = null;

    #[ORM\Column]
    private ?int $timeTaken = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getResult(): ?Result
    {
        return $this->result;
    }

    public function setResult(?Result $result): static
    {
        $this->result = $result;

        return $this;
    }

    public function getQuestion(): ?Question
    {
        return $this->question;
    }

    public function setQuestion(?Question $question): static
    {
        $this->question = $question;

        return $this;
    }

    public function getSelectedResponse(): ?Response
    {
        return $this->selectedResponse;
    }

    public function setSelectedResponse(?Response $selectedResponse): static
    {
        $this->selectedResponse = $selectedResponse;

        return $this;
    }

    public function isIsCorrect(): ?bool
    {
        return $this->isCorrect;
    }

    public function setIsCorrect(bool $isCorrect): static
    {
        $this->isCorrect = $isCorrect;

        return $this;
    }

    public function getTimeTaken(): ?int
    {
        return $this->timeTaken;
    }

    public function setTimeTaken(int $timeTaken): static
    {
        $this->timeTaken = $timeTaken;

        return $this;
    }
}
