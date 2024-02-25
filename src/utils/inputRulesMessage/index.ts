const rulesMessage = {
  requiredInput: {
    vars: ['inputName'],
    message: 'لطفا {{inputName}} را وارد نمایید'
  },
  requiredSelectBox: {
    vars: ['inputName'],
    message: 'لطفا {{inputName}} را انتخاب نمایید'
  },
  requiredRadio: {
    vars: ['inputName'],
    message: 'لطفا {{inputName}} را مشخص نمایید'
  },
  requiredUpload: {
    vars: ['inputName'],
    message: 'لطفا {{inputName}} را آپلود نمایید'
  },
  URLInvalid: {
    vars: ['inputName'],
    message: 'لطفا {{inputName}} معتبر وارد نمایید'
  },
  invalidEmail: {
    vars: [],
    message: 'لطفا یک پست الکترونیک معتبر وارد نمایید'
  },
  invalidNationalCode: {
    vars: [],
    message: 'کد ملی وارد شده اشتباه است'
  },
  mustBeNumber: {
    vars: ['inputName'],
    message: 'لطفا {{inputName}} را به صورت عدد وارد نمایید'
  },
  length: {
    vars: ['inputName', 'length'],
    message: '{{inputName}} باید {{length}} کارکتر باشد'
  },
  minLength: {
    vars: ['inputName', 'length'],
    message: '{{inputName}} نمی تواند کمتر از {{length}} کاراکتر باشد'
  },
  maxLength: {
    vars: ['inputName', 'length'],
    message: '{{inputName}} نمی تواند بیشتر از {{length}} کاراکتر باشد'
  },
  requiredTermsAndCondition: {
    vars: [],
    message: 'لطفا با قوانین و مقرارات سیستم موافقت کنید'
  },
  passwordsDoNotMatch: {
    vars: [],
    message: 'رمز های عبور باهم مطابقت ندارند'
  },
  mobileStartWith: {
    vars: [],
    message: 'شماره موبایل باید با 09 شروع شود'
  },
  minLengthAmount: {
    vars: ['inputName', 'length'],
    message: '{{inputName}} باید حداقل {{length}} ریال باشد'
  },
  maxLengthAmount: {
    vars: ['inputName', 'length'],
    message: '{{inputName}} باید حداکثر {{length}} ریال باشد'
  },
  imageUploadTypeError: {
    vars: ['inputName', 'types'],
    message: '{{inputName}} باید یکی از فرمت های ({{types}}) باشد'
  },
  imageUploadRequired: {
    vars: ['inputName'],
    message: 'لطفا {{inputName}} را آپلود نمایید'
  },
  imageUploadSizeError: {
    vars: ['inputName', 'size'],
    message: '{{inputName}} باید کوچکتر از {{size}} باشد!'
  }
} as const;

export default rulesMessage;
