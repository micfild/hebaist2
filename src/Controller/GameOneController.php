<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class GameOneController extends AbstractController
{
    /**
     * @Route("/game/one", name="game_one")
     */
    public function index()
    {
        if (!$this->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->redirectToRoute('app_login');
        }


        return $this->render('game_one/index.html.twig', [
            'controller_name' => 'GameOneController',
        ]);
    }

}
