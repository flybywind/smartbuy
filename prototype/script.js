document.addEventListener('DOMContentLoaded', function() {
    // 密码显示/隐藏功能
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('input[type="password"]');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            // 切换密码显示类型
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // 切换图标
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    // 表单提交处理
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const username = this.querySelector('input[type="text"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // 这里可以添加表单验证逻辑
            if (!username || !password) {
                alert('请填写用户名和密码');
                return;
            }
            
            // 模拟登录请求
            console.log('登录请求:', { username, password });
            
            // 实际项目中，这里应该发送登录请求到服务器
            // 例如：
            /*
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/dashboard';
                } else {
                    alert(data.message || '登录失败，请检查用户名和密码');
                }
            })
            .catch(error => {
                console.error('登录错误:', error);
                alert('登录过程中发生错误，请稍后再试');
            });
            */
            
            // 为了演示，我们直接显示一个成功消息
            alert('登录成功！');
        });
    }
    
    // 微信登录按钮点击事件
    const wechatBtn = document.querySelector('.wechat-btn');
    if (wechatBtn) {
        wechatBtn.addEventListener('click', function() {
            alert('正在跳转到微信登录...');
            // 实际项目中，这里应该跳转到微信授权页面
        });
    }
}); 