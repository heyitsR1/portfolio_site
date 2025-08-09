@@ .. @@
-server.listen(3000, () => {
-  console.log('Server running at http://localhost:3000/');
+server.listen(3000, '0.0.0.0', () => {
+  console.log('Server running at http://localhost:3000/');
 });