import { Component } from '@angular/core';




@Component({
  selector: 'LL-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent{

  currentLanguage: string = "english";

  privacyPolicy: { [key: string]:any } = {

    "german": {
      "introduction": "Diese Datenschutzerklärung klärt die Nutzer über die Art, den Umfang und den Zweck der Erhebung und Verwendung personenbezogener Daten durch [Ihr Unternehmen] auf dieser Website ([Ihre Website-URL]) auf.",
      "dataController": "Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO):\n\n[Ihr Unternehmen]\n[Ihre Adresse]\n[Ihre E-Mail-Adresse]\n[Ihre Telefonnummer]",
      "dataTypes": "- Personenbezogene Daten (z.B. Name, E-Mail-Adresse)\n- Kontaktdaten (z.B. Adresse, Telefonnummer)\n- Nutzungsdaten (z.B. besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten)\n- Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen)",
      "dataProcessingPurpose": "- Bereitstellung der Website und ihrer Funktionen\n- Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern\n- Sicherheitsmaßnahmen\n- Reichweitenmessung und Analyse der Nutzeraktivitäten",
      "legalBases": "Die Verarbeitung personenbezogener Daten erfolgt aufgrund der folgenden Rechtsgrundlagen:\n\n- Einwilligung gemäß Artikel 6 Absatz 1 Buchstabe a DSGVO\n- Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gemäß Artikel 6 Absatz 1 Buchstabe b DSGVO\n- Erfüllung einer rechtlichen Verpflichtung gemäß Artikel 6 Absatz 1 Buchstabe c DSGVO\n- Schutz lebenswichtiger Interessen der betroffenen Person oder einer anderen natürlichen Person gemäß Artikel 6 Absatz 1 Buchstabe d DSGVO\n- Wahrnehmung einer Aufgabe, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt, die dem Verantwortlichen übertragen wurde gemäß Artikel 6 Absatz 1 Buchstabe e DSGVO\n- Wahrung der berechtigten Interessen des Verantwortlichen oder eines Dritten gemäß Artikel 6 Absatz 1 Buchstabe f DSGVO",
      "dataDeletion": "Die personenbezogenen Daten der betroffenen Person werden gelöscht oder gesperrt, sobald der Zweck der Speicherung entfällt. Eine Speicherung kann darüber hinaus dann erfolgen, wenn dies durch den europäischen oder nationalen Gesetzgeber in unionsrechtlichen Verordnungen, Gesetzen oder sonstigen Vorschriften vorgesehen wurde.",
      "userRights": "- Das Recht auf Auskunft gemäß Artikel 15 DSGVO\n- Das Recht auf Berichtigung gemäß Artikel 16 DSGVO\n- Das Recht auf Löschung gemäß Artikel 17 DSGVO\n- Das Recht auf Einschränkung der Verarbeitung gemäß Artikel 18 DSGVO\n- Das Recht auf Datenübertragbarkeit gemäß Artikel 20 DSGVO\n- Das Recht auf Widerspruch gegen die Verarbeitung gemäß Artikel 21 DSGVO",
      "objectionRight": "Sofern Ihre personenbezogenen Daten auf Grundlage von berechtigten Interessen gemäß Artikel 6 Absatz 1 Buchstabe f DSGVO verarbeitet werden, haben Sie das Recht, gemäß Artikel 21 DSGVO Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten einzulegen, soweit dafür Gründe vorliegen, die sich aus Ihrer besonderen Situation ergeben oder sich der Widerspruch gegen Direktwerbung richtet.",
      "complaintRight": "Sie haben das Recht, eine Beschwerde bei der zuständigen Aufsichtsbehörde einzulegen, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen Datenschutzgesetze verstößt.",
      "changes": "Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.",
      "lastUpdated": "Letzte Aktualisierung: 06/09/2023"
    },
    "english": {
      "introduction": "This privacy policy informs users about the nature, scope, and purpose of the collection and use of personal data by [Your Company] on this website ([Your Website URL]).",
      "dataController": "Data Controller according to the General Data Protection Regulation (GDPR):\n\n[Your Company]\n[Your Address]\n[Your Email Address]\n[Your Phone Number]",
      "dataTypes": "- Personal data (e.g., name, email address)\n- Contact details (e.g., address, phone number)\n- Usage data (e.g., visited pages, interest in content, access times)\n- Meta/communication data (e.g., device information, IP addresses)",
      "dataProcessingPurpose": "- Providing the website and its features\n- Responding to contact requests and communicating with users\n- Security measures\n- Audience measurement and analysis of user activities",
      "legalBases": "The processing of personal data is based on the following legal bases:\n\n- Consent pursuant to Article 6(1)(a) GDPR\n- Performance of a contract or pre-contractual measures pursuant to Article 6(1)(b) GDPR\n- Compliance with a legal obligation pursuant to Article 6(1)(c) GDPR\n- Protection of vital interests of the data subject or another natural person pursuant to Article 6(1)(d) GDPR\n- Performance of a task carried out in the public interest or in the exercise of official authority vested in the controller pursuant to Article 6(1)(e) GDPR\n- Legitimate interests pursued by the controller or a third party pursuant to Article 6(1)(f) GDPR",
      "dataDeletion": "Personal data of the data subject will be deleted or blocked as soon as the purpose of storage ceases to apply. Storage may also take place if this has been provided for by the European or national legislator in EU regulations, laws, or other provisions.",
      "userRights": "- The right to information pursuant to Article 15 GDPR\n- The right to rectification pursuant to Article 16 GDPR\n- The right to erasure ('right to be forgotten') pursuant to Article 17 GDPR\n- The right to restriction of processing pursuant to Article 18 GDPR\n- The right to data portability pursuant to Article 20 GDPR\n- The right to object to processing pursuant to Article 21 GDPR",
      "objectionRight": "If personal data is processed based on legitimate interests pursuant to Article 6(1)(f) GDPR, data subjects have the right to object to the processing of their personal data for reasons arising from their particular situation or if the objection is directed against direct marketing.",
      "complaintRight": "You have the right to lodge a complaint with the supervisory authority if you believe that the processing of your personal data violates data protection laws.",
      "changes": "We reserve the right to amend this privacy policy to ensure that it complies with current legal requirements or to implement changes to our services within the privacy policy, such as the introduction of new services. In such cases, the new privacy policy will apply to your next visit.",
      "lastUpdated": "Last Updated: 09/06/2023"
    }
};

  changeLanguage(language: string) {
    this.currentLanguage = language;
  }

}
