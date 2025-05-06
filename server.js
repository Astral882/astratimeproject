<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <title>申请提款 / Withdrawal</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h2>申请提款 / Apply Withdrawal</h2>

    <p>当前可提余额 / Available Balance: <span id="availableAmount">--</span> MYR</p>
    <p>本月剩余提款次数 / Remaining Withdrawals This Month: <span id="remaining">--</span></p>

    <form onsubmit="event.preventDefault(); submitWithdraw();">
      <label>提款金额 / Amount:</label>
      <input type="number" id="amount" required min="1" placeholder="请输入金额 / Enter amount" />

      <label>选择币种 / Choose Currency:</label><br />
      <label><input type="radio" name="currency" value="USDT" checked /> USDT</label>
      <label><input type="radio" name="currency" value="MYR" /> MYR</label>

      <br /><br />
      <button class="btn">提交提款申请 / Submit Withdrawal</button>
    </form>

    <div id="result" style="margin-top:20px;"></div>

    <div class="notice" style="margin-top:30px; background:#f4f4f4; padding:15px; border-radius:6px;">
      <b>提款说明 / Withdrawal Notice</b><br>
      • 每位投资者每月限提 2 次<br>
      • USDT 提款将在 7 个工作日内到账<br>
      • 马币提款将在 11 个工作日内到账
    </div>
  </div>

  <script>
    const userId = 'user1'; // 实际使用应从登录状态中获取

    // 加载账户数据
    fetch(`/api/account/${userId}`)
      .then(res => res.json())
      .then(data => {
        document.getElementById('availableAmount').innerText = data.flexibleFund.toFixed(2);
        document.getElementById('remaining').innerText = 2 - (data.withdrawCount || 0);
      });

    function submitWithdraw() {
      const amount = document.getElementById('amount').value;
      const currency = document.querySelector('input[name="currency"]:checked').value;

      fetch('/api/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, amount, currency })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          document.getElementById('result').innerHTML = `✅ 提款成功 / Withdrawal Successful<br>剩余余额 / New Balance: ${data.newBalance} MYR`;
        } else {
          document.getElementById('result').innerHTML = `❌ 错误 / Error: ${data.error}`;
        }
      });
    }
  </script>
</body>
</html>