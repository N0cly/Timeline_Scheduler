<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * TransformJsonRequestSubscriber decodes the content of an "application/json" http request from a JSON string
 * to a PHP associative array.
 * Decoded array will replace the "request" attribute of the http request object (body parameters).
 */
class TransformJsonRequestSubscriber implements EventSubscriberInterface
{
    /**
     * Subscribe to Symfony Kernel Controller event.
     */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::CONTROLLER => 'decodeJsonContentToArray',
        ];
    }

    /**
     * Decode the request content and replace the "request" attribute value.
     */
    public function decodeJsonContentToArray(ControllerEvent $event): void
    {
        $request = $event->getRequest();

        if ($this->supports($request)) {
            $data = json_decode($request->getContent(), true);
            $request->request->replace(is_array($data) ? $data : []);
        }
    }

    /**
     * Indicates if the request content should be decoded.
     */
    private function supports(Request $request): bool
    {
        return 'json' === $request->getContentTypeFormat() && $request->getContent();
    }
}