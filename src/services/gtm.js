function push(data) {
  window.dataLayer.push(data) // eslint-disable-line fp/no-mutating-methods, more/no-window
}

function pushAuthSuccess(isVerified) {
  push({
    event: 'AuthSuccess',
    eventCategory: 'Auth',
    eventAction: 'SendForm',
    eventLabel: 'Success',
    userType: isVerified ? 'Verified' : 'NotVerified',
  })
}

function pushRegistrationEmail() {
  push({
    event: 'RegistrationEmail',
    eventCategory: 'VerificationProcess',
    eventAction: 'SuccessStepConfirm',
    eventLabel: 'EmailPassword',
  })
}

function pushVerificationNextStep(eventLabel) {
  push({
    event: 'VerificationNextStep',
    eventCategory: 'VerificationProcess',
    eventAction: 'SuccessStepConfirm',
    eventLabel,
  })
}

function pushRegistrationSuccess() {
  push({
    event: 'RegistrationSuccess',
    eventCategory: 'VerificationProcess',
    eventAction: 'CompleteAll',
    eventLabel: 'Success',
  })
}

function pushProfileAddedEth() {
  push({
    event: 'ProfileAddedEth',
    eventCategory: 'UserProfile',
    eventAction: 'ETHAddressAdd',
    eventLabel: 'Success',
  })
}

function pushProfileRequestWithdraw() {
  push({
    event: 'ProfileRequestWithdraw',
    eventCategory: 'UserProfile',
    eventAction: 'ETHWithdraw',
    eventLabel: 'Success',
  })
}

function pushProfileSendRequest() {
  push({
    event: 'ProfileSendRequest',
    eventCategory: 'UserProfile',
    eventAction: 'SendRequest',
    eventLabel: 'RejectedVerification',
  })
}

export default {
  pushAuthSuccess,
  pushRegistrationEmail,
  pushVerificationNextStep,
  pushRegistrationSuccess,
  pushProfileAddedEth,
  pushProfileRequestWithdraw,
  pushProfileSendRequest,
}
