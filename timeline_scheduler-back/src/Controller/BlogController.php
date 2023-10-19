<?php

// src/Controller/BlogController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController
{
    #[Route('/api/blog', name: 'blog_list')]
    public function list(): JsonResponse
    {
        $results = array('salut');
        return new JsonResponse($results);
    }
}