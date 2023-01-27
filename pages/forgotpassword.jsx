const ForgotPassword = () => {
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
        <h4 class="mb-2">Reset password</h4>
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Enter your email address and we will send you a link to reset your password.</label>
                        <input type="email" class="form-control form-control-sm" placeholder="Enter your email address" />
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Send password reset email</button>
                </form>
            </div>
        </div>
        </div>
        </div>
    );
}

export default ForgotPassword;