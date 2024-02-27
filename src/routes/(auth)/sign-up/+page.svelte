<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;
	let isLoading = false;
</script>

<section id="autcard_log">
	<div class="container">
		<div class="row">
			<div class="card">
				<div class="card-body p-0">
					<div class="autcard_logi row">
						<div class="col-md-5 p-0">
							<div
								class="autcard_logil text-center"
								style="background:#3587f4; padding:40px 30px 150px 30px;"
							>
								<h2 style="font-size: 1.728rem;" class="text-center mb-4">
									<a class="text-white" href="#">JKUGS PANEL</a>
								</h2>
								<p class="opacity-75 text-white">
									With the power of Svelte, you can now focus only on functionaries for your digital
									products, while leaving the UI design on us!
								</p>
								<h6 class="text-light mb-3" style="margin-top:120px;">Have an account?<br /></h6>
								<h6><a class="log_bt" href="/sign-in">Log In</a></h6>
							</div>
						</div>
						<div class="col-md-7">
							<form
								use:enhance={() => {
									isLoading = true;
									return async ({ result }) => {
										toast.promise(
											new Promise((resolve, reject) => {
												setTimeout(Math.random() < 1.3 ? resolve : reject, 1000);
											}),
											{
												loading: 'Saving...',
												success: 'Created Successfully',
												error: 'Failed to Register'
											}
										);

										isLoading = false;
									};
								}}
								method="post"
							>
								<div class="autcard_logir autcard_logiro" style="padding:40px 30px;">
									<h3 style="font-size: 1.728rem;" class="mb-3">Register</h3>
									<h6 class="colo_8 mb-2 font_14">Name</h6>
									<input
										disabled={isLoading}
										name="name"
										class="form-control form_log"
										type="text"
									/>
									<h6 class="colo_8 mb-2 font_14 mt-3">Phone Number</h6>
									<input
										disabled={isLoading}
										name="phone"
										class="form-control form_log"
										type="phone"
									/>
									<div class="autcard_logiri row">
										<div class="col-md-6">
											<div class="autcard_logiril">
												<h6 class="colo_8 mb-2 font_14 mt-3">Password</h6>
												<input
													disabled={isLoading}
													name="password"
													class="form-control form_log"
													type="password"
												/>
											</div>
										</div>
										<div class="col-md-6">
											<div class="autcard_logiril">
												<h6 class="colo_8 mb-2 font_14 mt-3">Confirm Password</h6>
												<input
													disabled={isLoading}
													name="confirm_password"
													class="form-control form_log"
													type="password"
												/>
											</div>
										</div>
									</div>

									<button
										class="btn btn-primary d-block w-100 mt-3 bold"
										type="submit"
										on:click={() => {
											isLoading = true;
										}}>Register</button
									>
									<h6 class="text-center mt-3 normal colo_1 text_13 behalf">or register with</h6>
									<div class="autlog_1i1 row mt-3">
										<div class="col-md-6">
											<div class="autlog_1i1l text-center">
												<h6 class="d-block mb-0">
													<a class="google_btn d-block" href="#"
														><i
															style="vertical-align:middle; font-size:20px;   margin-right:3px;"
															class="fa fa-google-plus"
														/> google</a
													>
												</h6>
											</div>
										</div>
										<div class="col-md-6">
											<div class="autlog_1i1l text-center">
												<h6 class="d-block mb-0">
													<a class="fb_btn d-block" href="#"
														><i
															style="vertical-align:middle; font-size:20px; margin-right:3px;"
															class="fa fa-facebook-square"
														/> facebook</a
													>
												</h6>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
