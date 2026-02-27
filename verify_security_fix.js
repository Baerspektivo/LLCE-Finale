const fs = require('fs');

const filePath = 'src/app/app.component.ts';

try {
  const content = fs.readFileSync(filePath, 'utf8');

  const vulnerablePatterns = [
    "console.log('Cookie value', cookieValue)",
    "this.cookieServ.set('cookieName', 'cookieValue')",
    "this.cookieServ.get('cookieName')"
  ];

  let foundVulnerability = false;

  vulnerablePatterns.forEach(pattern => {
    if (content.includes(pattern)) {
      console.error(`Vulnerability found: "${pattern}" is still present in ${filePath}`);
      foundVulnerability = true;
    }
  });

  if (foundVulnerability) {
    console.log('Verification FAILED: Vulnerable code detected.');
    process.exit(1);
  } else {
    console.log('Verification PASSED: Vulnerable code not found.');
  }

} catch (err) {
  console.error('Error reading file:', err);
  process.exit(1);
}
