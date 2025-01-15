export enum RelationshipStatus {
  Rejected = 'Rejected',
  Pending = 'Pending',
  Accepted = 'Accepted',
}

export enum RelationshipType {
  Block = 'Block',
  Follow = 'Follow',
}
export enum Visibility {
  Public = 0, // Visible to everyone
  FriendsOnly = 1, // Visible only to friends
  Private = 2,
}
