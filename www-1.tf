resource "digitalocean_droplet" "www-1" {
  image = "docker-20-04"
  name = "www-1"
  region = "sfo3"
  size = "s-1vcpu-1gb"
  ssh_keys = [
    data.digitalocean_ssh_key.mac.id
  ]

  connection {
      host = self.ipv4_address
      user = "root"
      type = "ssh"
      private_key = file(var.pvt_key)
      timeout = "2m"
      agent = true
  }

  provisioner "remote-exec" {
    inline = [
      "export PATH=$PATH:/usr/bin",
    ]
  }

  provisioner "local-exec" {
    command = <<-EOT
      echo "" > ./hosts
      echo "[servers]" >> ./hosts
      echo "www-1 ansible_host=${digitalocean_droplet.www-1.ipv4_address}" >> ./hosts
      echo "" >> ./hosts
      echo "[all:vars]" >> ./hosts
      echo "ansible_python_interpreter=/usr/bin/python3" >> ./hosts
      EOT
  }
}
