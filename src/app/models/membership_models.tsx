export interface MembershipRankData {
  membershipRankId: number;
  membershipRankName: string;
  moneySpent: number;
  discountPercentage: number;
  content: string;
  dateCreate: string;
  status: string;
}

export interface CustomerMemberShip {
  membershipRankId: number;
  membershipRankName: string;
  moneySpent: number;
  discountPercentage: number;
  content: string;
  dateCreate: string;
  status: string;
  membershipRankLogs: MembershipLog[];
}

export interface MembershipLog {
  membershipRankLogId: number;
  membershipRankId: number;
  accountId: number;
  action: string;
  dateCreate: string;
}
