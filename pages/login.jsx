
const Login = ()=>{
    return (
<div class="authentication-wrapper authentication-cover">
  <div class="authentication-inner row m-0">
    <div class="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5">
      <div class="w-100 d-flex justify-content-center">
        <img src="./img/illustrations/boy-with-rocket-light.png" class="img-fluid" alt="Login image" width="700"/>
      </div>
    </div>
    <div class="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-5 p-4">
      <div class="w-px-400 mx-auto">
      <img src="./img/illustrations/boy-with-rocket-light.png" class="img-fluid" alt="Logo image" width="700"/>
        <h4 class="mb-2">Welcome to Sneat! 👋</h4>
        <p class="mb-4">Please sign-in to your account and start the adventure</p>
        <button class="btn btn-primary d-grid w-100">
            Sign in
          </button>
        <form id="formAuthentication" class="mb-3 fv-plugins-bootstrap5 fv-plugins-framework" action="index.html" method="POST" novalidate="novalidate">
          <div class="mb-3 fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
            <label for="email" class="form-label">Email or Username</label>
            <input type="text" class="form-control" id="email" name="email-username" placeholder="Enter your email or username" autofocus=""/>
          <div class="fv-plugins-message-container invalid-feedback"></div></div>
          <div class="mb-3 form-password-toggle fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
            <div class="d-flex justify-content-between">
              <label class="form-label" for="password">Password</label>
              <a href="auth-forgot-password-cover.html">
                <small>Forgot Password?</small>
              </a>
            </div>
            <div class="input-group input-group-merge has-validation">
              <input type="password" id="password" class="form-control" name="password" placeholder="············" aria-describedby="password"/>
              <span class="input-group-text cursor-pointer"><i class="fa fa-eye-slash"></i></span>
            </div><div class="fv-plugins-message-container invalid-feedback"></div>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="remember-me"/>
              <label class="form-check-label" for="remember-me">
                Remember Me
              </label>
            </div>
          </div>
          <button class="btn btn-primary d-grid w-100">
            Sign in
          </button>
        </form>

        <p class="text-center">
          <span>New on our platform?</span>
          <a href="auth-register-cover.html">
            <span>Create an account</span>
          </a>
        </p>
      </div>
    </div>
  </div>
</div>
    );
}

export default Login;