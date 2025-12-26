import fs from 'fs';
import path from 'path';

const input = process.argv[2];

if (!input) {
  console.error('❌ Informe o nome do arquivo. Ex: contact ou pages/contact');
  process.exit(1);
}

const parts = input.split('/');
const name = parts.pop();

const baseDir = path.resolve(process.cwd(), 'src', ...parts, name);
const filePath = path.join(baseDir, name);

fs.mkdirSync(baseDir, { recursive: true });

if (fs.existsSync(filePath)) {
  console.error('❌ Arquivo já existe:', filePath);
  process.exit(1);
}

const html = `<p>{{name}}</p>`;

const script = `import { Render } from "vfront-lib";

export default function ${name.charAt(0).toUpperCase() + name.slice(1)}(params) {
  return Render('${name}', {
    imports: [],
    start() {},
    name: '${name}'
  });
}
`;

const style = ``;

fs.writeFileSync(`${filePath}.html`, html, 'utf8');
fs.writeFileSync(`${filePath}.js`, script, 'utf8');
fs.writeFileSync(`${filePath}.scss`, style, 'utf8');

console.log('✅ Criado:', filePath);

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

