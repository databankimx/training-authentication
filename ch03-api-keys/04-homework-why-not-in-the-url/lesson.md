# Homework: Why Not Put a Key in the URL

The previous step said a key belongs in a header, not in the URL. Write a short answer that names three places a key in a URL gets copied to, and says why each one is a problem.

Write one or two sentences for each place. Keep to what you can explain, and say so if you're unsure of one.

~~~spoiler
Any three of these work, as long as each one says what goes wrong.

Server and proxy logs. Web servers, load balancers, and proxies commonly record the full address of every request, so a key in the query string is written to a file that many people can read and that is kept for a long time.

Browser history and bookmarks. If a person opens an address that contains a key, the key is stored in the browser's history, and it can be synced to other devices.

The Referer header. When a page links out, the browser can send the address of the page it came from to the linked site. An address that contains a key can therefore be handed to a third party.

Shared links and screenshots. An address is easy to paste into a chat, a ticket, or a document, and the key goes with it.

Monitoring and error reports. Tools that track failed requests often capture the full address, so the key shows up in dashboards and alerts that a wide audience can see.
~~~

---
