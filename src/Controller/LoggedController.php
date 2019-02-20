<?php

namespace App\Controller;


use App\Entity\Users;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;


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
    public function delete(Request $request, Users $user, Session $session, TokenStorageInterface $tokenStorage)
    {
        if ($this->isCsrfTokenValid('delete'.$user->getId(), $request->request->get('_token'))) {

            $tokenStorage->setToken(null);
            $session->invalidate();

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($user);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_login');
    }
}
