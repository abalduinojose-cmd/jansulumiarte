type Classe = string | false | null | undefined;

export function cx(...valores: Classe[]): string {
  return valores.filter(Boolean).join(" ");
}
