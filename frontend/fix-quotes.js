const fs = require('fs');

const fixes = [
  {
    file: 'app/admin/page.jsx',
    replace: [
      ["Here's what's", "Here&apos;s what&apos;s"]
    ]
  },
  {
    file: 'components/public/AboutSection.jsx',
    replace: [
      ["we're not just", "we&apos;re not just"],
      ["we're building", "we&apos;re building"],
      ["isn't a gym", "isn&apos;t a gym"],
      ["it's a sweat-drenched", "it&apos;s a sweat-drenched"],
      ["isn't our premium", "isn&apos;t our premium"],
      ["it's how we've", "it&apos;s how we&apos;ve"]
    ]
  },
  {
    file: 'components/public/AboutStory.jsx',
    replace: [
      ["isn't a gym", "isn&apos;t a gym"],
      ["it's a sweat-drenched", "it&apos;s a sweat-drenched"],
      ["isn't our premium", "isn&apos;t our premium"],
      ["it's how we've", "it&apos;s how we&apos;ve"]
    ]
  },
  {
    file: 'components/public/ContactSection.jsx',
    replace: [
      ["We'll get back", "We&apos;ll get back"]
    ]
  },
  {
    file: 'components/public/EventsContactSection.jsx',
    replace: [
      ["WE'VE GOT", "WE&apos;VE GOT"],
      ["We'll get back", "We&apos;ll get back"]
    ]
  },
  {
    file: 'components/public/EventsFeatures.jsx',
    replace: [
      ["don't go to", "don&apos;t go to"]
    ]
  },
  {
    file: 'components/public/ReviewsSection.jsx',
    replace: [
      ['"{review.reviewText}"', '&quot;{review.reviewText}&quot;']
    ]
  },
  {
    file: 'components/public/VisionariesSection.jsx',
    replace: [
      ["India's", "India&apos;s"],
      ["Abhilash's", "Abhilash&apos;s"],
      ["didn't", "didn&apos;t"],
      ["He's", "He&apos;s"],
      ["Suresh's", "Suresh&apos;s"],
      ["isn't", "isn&apos;t"],
      ["he's", "he&apos;s"]
    ]
  }
];

fixes.forEach(fix => {
  const p = __dirname + '/' + fix.file;
  if (!fs.existsSync(p)) return;
  let text = fs.readFileSync(p, 'utf8');
  fix.replace.forEach(([from, to]) => {
    text = text.replaceAll(from, to);
  });
  fs.writeFileSync(p, text);
});
console.log('Fixed quotes!');
