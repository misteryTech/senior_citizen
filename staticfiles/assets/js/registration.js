document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Frontend Bootstrap validation
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.terms = !!formData.get("terms"); // convert checkbox to boolean

    // Disable button while submitting
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Submitting...";

    try {
      const response = await fetch("/members/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check response type
      const contentType = response.headers.get("content-type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        console.error("Server returned HTML instead of JSON:", text);
        alert(
          "Server returned invalid response (HTML instead of JSON). Check server logs."
        );
        return;
      }

      if (!response.ok) {
        // Clear previous backend errors
        form.querySelectorAll(".backend-error").forEach((e) => e.remove());

        // Loop through each field error returned by Django
        Object.entries(result).forEach(([field, messages]) => {
          // Find the input by name
          const input = form.querySelector(`[name="${field}"]`);
          if (input) {
            const errorDiv = document.createElement("div");
            errorDiv.classList.add("text-danger", "mt-1", "backend-error");
            errorDiv.innerText = messages.join(", ");
            input.insertAdjacentElement("afterend", errorDiv);
          }
        });

        return;
      }


      // Success
      alert(result.message || "Account created successfully!");
      form.reset();
      form.classList.remove("was-validated");

      // Optional redirect after success
      // window.location.href = "/dashboard/";
    } catch (error) {
      console.error("Network or server error:", error);
      alert("Network or server error: " + error.message);
    } finally {
      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
});
