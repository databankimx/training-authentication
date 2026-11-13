# Homework: Why the State Is Tied to the Session

Suppose an application checks only that the callback carries a state value, and does not compare it with the session. Write a short answer that says what an attacker could do with that gap, at the level of the browser and the callback, without describing how to carry it out. Then say why a state that is unguessable and stored in the session closes the gap.

Write in your own words, in a short paragraph or two.

~~~spoiler
Without the comparison, a callback is accepted whatever state it carries. An attacker who can get a victim's browser to load a callback address they built, carrying a code from the attacker's own login, would have that code accepted in the victim's session. The victim's session would then be linked to the attacker's account, which is a login CSRF attack: the victim is signed in as someone else, and what they do afterward is recorded against that account.

The state closes the gap in two ways. It is generated at random when the login starts, so an attacker cannot predict a value that matches. It is stored in the session, so the callback is accepted only in the browser that started the login, where the matching value exists. An attacker can send the victim a callback, but the victim's session does not contain the value the attacker would need to supply.

The comparison has to happen on every callback, and it has to compare with the value the session stored, not with any value that happens to be present.
~~~

---
