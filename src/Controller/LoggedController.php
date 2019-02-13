<?php

namespace App\Controller;


use App\Entity\Users;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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

    /**
     * @Route("/logged/{id}", name="user_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Users $user): Response
    {
        if ($this->isCsrfTokenValid('delete'.$user->getId(), $request->request->get('_token'))) {

            $service->logout();

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($user);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_login');
    }
}
