export function formatApiError(error: unknown, fallback: string): string {
  if (typeof error === 'string' && error.trim()) {
    return error;
  }

  if (error && typeof error === 'object' && 'formErrors' in error) {
    const formErrors = (error as { formErrors?: string[] }).formErrors;
    if (formErrors?.[0]) return formErrors[0];
  }

  if (error && typeof error === 'object' && 'fieldErrors' in error) {
    const fieldErrors = (error as { fieldErrors?: Record<string, string[]> }).fieldErrors;
    const firstField = fieldErrors && Object.values(fieldErrors).flat()[0];
    if (firstField) return firstField;
  }

  return fallback;
}
