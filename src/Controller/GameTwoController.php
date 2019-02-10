<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class GameTwoController extends AbstractController
{
    /**
     * @Route("/game/two", name="game_two")
     */
    public function index()
    {
        return $this->render('game_two/index.html.twig', [
            'controller_name' => 'GameTwoController',
        ]);
    }
}
