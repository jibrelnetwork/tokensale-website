function push(data) {
  const dataLayer = window.dataLayer || [] // eslint-disable-line more/no-window
  dataLayer.push(data) // eslint-disable-line fp/no-mutating-methods
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

/**
 * eventLabel value is one of ConfirmAgreement/BasicInfo/PassportScan
 */
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

function pushPageView(pathname) {
  push({
    event: 'VirtualPageView',
    virtualTitle: document.title,
    virtualUrl: pathname,
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
  pushPageView,
}
