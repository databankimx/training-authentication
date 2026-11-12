# Homework: When the Server Says Slow Down

A device has been polling the token endpoint every five seconds, and the server answers `slow_down`. Write a short answer that says what the device should do next, and what would go wrong if it kept polling at the same rate.

Write in your own words, in a short paragraph or two. Say what the device must change, and who would be affected by a device that doesn't change it.

~~~spoiler
The device should wait longer before its next poll, using the increased interval the server gives or a larger step than before, and keep to that interval until the server stops asking. The answer means that the device is making requests faster than the server allows.

If the device ignores the answer, the server keeps refusing or delaying its polls, and it may block the device for a period. The device never receives its tokens while it is blocked, so the person waiting on the other screen sees nothing happen. Other devices sharing the same client can be affected too, because the limit is applied to the client, not only to one device.

Honoring the answer costs a few seconds of waiting, and protects the server and the person's experience. The device is the party that has to adapt, because it is the one making the requests.
~~~

---
