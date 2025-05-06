<!-- dashboard.html -->
<script>
  const userId = 'user1';
  fetch(`/api/account/${userId}`)
    .then(res => res.json())
    .then(data => {
      if (data.agreementSigned) {
        document.getElementById('agreementStatus').innerText = `✅ 已签署 / Signed (${data.agreementCode})`;
      }
      if (data.proxySigned) {
        document.getElementById('proxyStatus').innerText = `✅ 已签署 / Signed (${data.proxyCode})`;
      }
    });
</script>