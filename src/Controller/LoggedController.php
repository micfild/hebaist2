<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class LoggedController extends AbstractController
{
    /**
     * @Route("/logged", name="logged")
     */
    public function index()
    {
        return $this->render('logged/index.html.twig', [
            'controller_name' => 'LoggedController',
        ]);
    }
}
