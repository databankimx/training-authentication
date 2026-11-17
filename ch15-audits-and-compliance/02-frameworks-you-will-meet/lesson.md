# 2. Frameworks You Will Meet

A framework is a set of criteria, written by a standards body or an industry group, that an organization can be audited against. Several frameworks cover authentication, and most organizations meet more than one. The list below is short, and it's a starting point, not a complete survey.

## SOC 2

SOC 2 is a report on controls, produced by an independent auditor under the attestation standards of the American Institute of CPAs. It is organized around five Trust Services Criteria: security, availability, processing integrity, confidentiality, and privacy. Security is always included, and authentication sits mostly under the security criteria, in the controls for logical access.

SOC 2 reports come in two types. A Type I report describes whether controls were designed correctly at one point in time. A Type II report covers a period, and tests that the controls operated throughout it. Customers often ask for a Type II report.

## ISO/IEC 27001

ISO/IEC 27001 is an international standard for an information security management system. An organization can be certified against it, and a certification body audits it. The standard's Annex A lists controls that cover authentication, including controls for managing authentication information and secure log-on, and for the rights a user holds. The current version groups these under the headings the standard uses, so check the wording in the edition your organization follows.

## Other frameworks you may meet

- **PCI DSS** applies to organizations that handle payment card data. Its requirements cover identifying users and authenticating their access, including multi-factor authentication for certain access.
- **HIPAA** applies in the United States to organizations that handle protected health information. Its security rule includes access control and audit controls.
- **National and sector standards** apply in some countries and industries, and can be stricter than the frameworks above.

> **Aside: a framework names what to show, not how to build it.**
> A framework tells an auditor what must be true, such as access being restricted and removed when it is no longer needed. It doesn't tell you which tool to use. The same requirement can be met several ways, and the evidence should show that the way you chose works.

> **Common mistake.** Treating a certification as a permanent guarantee. An audit covers a period or a moment. Controls can drift between audits, and the evidence has to keep being produced, not produced once.

---
