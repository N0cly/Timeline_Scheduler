<?php

// src/Controller/JobController.php

namespace App\Controller;

use App\Service\JobService;
use Container5MCm43p\getJobControllerService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class JobController extends AbstractController
{

    #[Route('/api/job/planning/get/{date}', name: 'job_planning_get', methods: ['GET', 'OPTIONS'])]
    public function planning(string $date):JsonResponse
    {
        if(!isset($date) ||$date==null ) {
            $date= date("Y-m-d");
        }
        $jobCtrl = new JobService();
        $result= $jobCtrl->getPlanning($date);

        return new JsonResponse($result);
    }

    #[Route('/api/job/planning/post', name: 'job_planning_post', methods: ['POST', 'OPTIONS'])]
    public function postPlanning(Request $request): JsonResponse
    {
       // print_r($request);
        $date = $request->request->get('date',date("Y-m-d"));


        $jobCtrl = new JobService();
        $result= $jobCtrl->postPlanning($date);

        return new JsonResponse($result);
    }



}