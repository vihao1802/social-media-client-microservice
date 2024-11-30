import { User } from "./user";

export interface PersonalMessenger {
  messenger: User;
  senderId: string;
  latest_message: string;
  message_created_at: string;
  relationshipId: string;
}
