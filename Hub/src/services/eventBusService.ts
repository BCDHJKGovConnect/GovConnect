import { EventEmitter } from "events";

export const eventBus = new EventEmitter();

export const publishEvent = (
  eventName: string,
  eventData: any
) => {
  console.log(`Event published: ${eventName}`);

  eventBus.emit(eventName, eventData);
};

export const subscribeToEvent = (
  eventName: string,
  handler: (data: any) => void
) => {
  eventBus.on(eventName, handler);
};