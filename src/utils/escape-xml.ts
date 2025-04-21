/**
 * Escapes special characters in a string for safe use in XML.
 *
 * This function replaces characters that have special meaning in XML documents
 * (`&`, `<`, `>`, `"`, and `'`) with their corresponding XML entities.
 *
 * It's primarily used when serializing user-generated content into RSS or Atom feeds
 * to ensure that the resulting XML is valid and does not break parsing.
 *
 * ### Replacements:
 * - `&` → `&amp;`
 * - `<` → `&lt;`
 * - `>` → `&gt;`
 * - `"` → `&quot;`
 * - `'` → `&#39;`
 * @param str - The raw string to escape
 * @returns The escaped string with XML entities
 */
export default function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
