export interface OutputFormat {
  value: string;
  label: string;
}

export const outputFormats: OutputFormat[] = [
  { value: 'markdown', label: 'Markdown' },
  { value: 'json', label: 'JSON' },
  { value: 'html', label: 'HTML' },
  { value: 'pdf', label: 'PDF' },
];