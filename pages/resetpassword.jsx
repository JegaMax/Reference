const ResetPassword= () =>{
    return (
<div class="authentication-wrapper authentication-cover">
  <div class="authentication-inner row m-0">

    <div class="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5">
      <div class="w-100 d-flex justify-content-center">
        <img src="./img/illustrations/boy-with-laptop-light.png" class="img-fluid" alt="Login image" width="600" data-app-dark-img="illustrations/boy-with-laptop-dark.png" data-app-light-img="illustrations/boy-with-laptop-light.png"/>

      </div>
    </div>
    <div class="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-4 p-sm-5">
      <div class="w-px-400 mx-auto">
        <div class="app-brand mb-5">
          <a href="index.html" class="app-brand-link gap-2">
            <span class="app-brand-text demo text-body fw-bolder">Sneat</span>
          </a>
        </div>
        <h4 class="mb-2">Reset Password 🔒</h4>
        <p class="mb-4">for <span class="fw-bold">john.doe@email.com</span></p>
        <form id="formAuthentication" class="mb-3 fv-plugins-bootstrap5 fv-plugins-framework" action="auth-login-cover.html" method="POST" novalidate="novalidate">
          <div class="mb-3 form-password-toggle fv-plugins-icon-container">
            <label class="form-label" for="password">New Password</label>
            <div class="input-group input-group-merge has-validation">
              <input type="password" id="password" class="form-control" name="password" placeholder="············" aria-describedby="password"/>
              <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
            </div><div class="fv-plugins-message-container invalid-feedback"></div>
          </div>
          <div class="mb-3 form-password-toggle fv-plugins-icon-container">
            <label class="form-label" for="confirm-password">Confirm Password</label>
            <div class="input-group input-group-merge has-validation">
              <input type="password" id="confirm-password" class="form-control" name="confirm-password" placeholder="············" aria-describedby="password"/>
              <span class="input-group-text cursor-pointer"><i class="fa fa-lock"></i></span>
            </div><div class="fv-plugins-message-container invalid-feedback"></div>
          </div>
          <div className="input-text">
                    <input type="text" placeholder="Enter your password" name="password" />
                    <i className="fa fa-lock"></i>
                    <i ></i>
                </div>
          <button class="btn btn-primary d-grid w-100 mb-3">
            Set new password
          </button>
          <div class="text-center">
            <a href="auth-login-cover.html">
              <i class="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
              Back to login
            </a>
          </div>
        <input type="hidden"/></form>
      </div>
    </div>
  </div>
</div>
    );
}

export default ResetPassword;