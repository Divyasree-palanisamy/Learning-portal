#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

void solve() {
    int n;
    cin >> n;
    vector<ll> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    
    // Calculate prefix sums
    vector<ll> prefix_sum(n + 1, 0);
    for (int i = 0; i < n; i++) {
        prefix_sum[i + 1] = prefix_sum[i] + a[i];
    }
    
    // Calculate suffix sums
    vector<ll> suffix_sum(n + 1, 0);
    for (int i = n - 1; i >= 0; i--) {
        suffix_sum[i] = suffix_sum[i + 1] + a[i];
    }
    
    // Find maximum prefix sum
    ll max_prefix = LLONG_MIN;
    for (int len = 1; len <= n - 2; len++) {
        max_prefix = max(max_prefix, prefix_sum[len]);
    }
    
    // Find maximum suffix sum
    ll max_suffix = LLONG_MIN;
    for (int len = 1; len <= n - 2; len++) {
        max_suffix = max(max_suffix, suffix_sum[n - len]);
    }
    
    // Find maximum middle subarray sum using Kadane's algorithm
    ll max_middle = LLONG_MIN;
    ll current_sum = 0;
    
    // We need to consider middle subarrays that don't overlap with prefix and suffix
    for (int start = 1; start < n - 1; start++) {
        for (int end = start; end < n - 1; end++) {
            ll sum = prefix_sum[end + 1] - prefix_sum[start];
            max_middle = max(max_middle, sum);
        }
    }
    
    ll result = max_prefix + max_middle + max_suffix;
    cout << result << endl;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t;
    cin >> t;
    while (t--) {
        solve();
    }
    
    return 0;
} 