const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
};

const replacements = [
  // Primary
  { regex: /bg-blue-600/g, replacement: 'bg-primary' },
  { regex: /hover:bg-blue-700/g, replacement: 'hover:bg-primary-dark' },
  { regex: /text-blue-600/g, replacement: 'text-primary' },
  { regex: /hover:text-blue-600/g, replacement: 'hover:text-primary-dark' },
  { regex: /ring-blue-500/g, replacement: 'ring-primary' },
  { regex: /border-blue-500/g, replacement: 'border-primary' },
  { regex: /focus:ring-blue-500/g, replacement: 'focus:ring-primary' },
  { regex: /focus:border-blue-500/g, replacement: 'focus:border-primary' },

  // Backgrounds & Surface
  { regex: /bg-gray-50/g, replacement: 'bg-background' },
  { regex: /hover:bg-gray-50/g, replacement: 'hover:bg-background' },
  { regex: /bg-white/g, replacement: 'bg-surface' },
  // Let's keep bg-gray-100 or map to background
  { regex: /bg-gray-100/g, replacement: 'bg-background' },
  { regex: /hover:bg-gray-100/g, replacement: 'hover:bg-background' },

  // Text
  { regex: /text-gray-900/g, replacement: 'text-text-main' },
  { regex: /text-gray-800/g, replacement: 'text-text-main' },
  { regex: /text-gray-700/g, replacement: 'text-text-main' },
  { regex: /text-gray-600/g, replacement: 'text-text-muted' },
  { regex: /text-gray-500/g, replacement: 'text-text-muted' },
  { regex: /text-gray-400/g, replacement: 'text-text-muted' },
  { regex: /placeholder-gray-500/g, replacement: 'placeholder-text-muted' },

  // Error
  { regex: /text-red-600/g, replacement: 'text-error' },
  { regex: /text-red-500/g, replacement: 'text-error' },
  { regex: /border-red-500/g, replacement: 'border-error' },
  { regex: /ring-red-500/g, replacement: 'ring-error' },

  // Success
  { regex: /text-green-600/g, replacement: 'text-success' },
  { regex: /text-green-500/g, replacement: 'text-success' },
  { regex: /bg-green-600/g, replacement: 'bg-success' },
  { regex: /hover:bg-green-700/g, replacement: 'opacity-90 hover:opacity-100 bg-success' },
];

const files = walkSync(path.join(__dirname, '../src'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  for (const { regex, replacement } of replacements) {
    content = content.replace(regex, replacement);
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
console.log("Color replacement complete.");
