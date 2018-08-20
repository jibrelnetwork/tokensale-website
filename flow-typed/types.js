// @flow

declare type VerificationStatus = void | "Preliminarily Approved" | "Pending" | "Approved" | "Declined"

declare type VerificationStage = "terms" | "user-info" | "document" | "loader"

declare type VerificationFormStatus = void | "personal_data_filled" | "passport_uploaded"

declare type ActiveLayout = 'welcome' | 'account' | 'verify' | 'misc'
