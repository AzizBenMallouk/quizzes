<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ApiResource]
class Result
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'results')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'results')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Quiz $quiz = null;

    #[ORM\Column]
    private ?int $scoreGlobal = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $takenAt = null;

    #[ORM\OneToMany(mappedBy: 'result', targetEntity: ResultDetail::class, orphanRemoval: true)]
    private Collection $details;

    public function __construct()
    {
        $this->details = new ArrayCollection();
        $this->takenAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getQuiz(): ?Quiz
    {
        return $this->quiz;
    }

    public function setQuiz(?Quiz $quiz): static
    {
        $this->quiz = $quiz;

        return $this;
    }

    public function getScoreGlobal(): ?int
    {
        return $this->scoreGlobal;
    }

    public function setScoreGlobal(int $scoreGlobal): static
    {
        $this->scoreGlobal = $scoreGlobal;

        return $this;
    }

    public function getTakenAt(): ?\DateTimeImmutable
    {
        return $this->takenAt;
    }

    public function setTakenAt(\DateTimeImmutable $takenAt): static
    {
        $this->takenAt = $takenAt;

        return $this;
    }

    /**
     * @return Collection<int, ResultDetail>
     */
    public function getDetails(): Collection
    {
        return $this->details;
    }

    public function addDetail(ResultDetail $detail): static
    {
        if (!$this->details->contains($detail)) {
            $this->details->add($detail);
            $detail->setResult($this);
        }

        return $this;
    }

    public function removeDetail(ResultDetail $detail): static
    {
        if ($this->details->removeElement($detail)) {
            // set the owning side to null (unless already changed)
            if ($detail->getResult() === $this) {
                $detail->setResult(null);
            }
        }

        return $this;
    }
}
