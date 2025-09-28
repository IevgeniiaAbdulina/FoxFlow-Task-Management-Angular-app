export interface MemberInterface {
  id: string /* authorization id */;
  userId: string /* firebase document id */;
  email: string;
  displayName: string;
  photoURL?: string;
}
