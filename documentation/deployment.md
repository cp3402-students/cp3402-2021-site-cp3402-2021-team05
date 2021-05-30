# Deployment

The aim of this document is to briefly describe the deployment and development workflow we utilised when creating this WordPress theme.  

## Working in the local environment
Our team used chose to use [VCCW](http://vccw.cc) as our local development environment.  
The following instructions are a summarised version of [this video](https://www.youtube.com/watch?v=W6Yp9PO7mr0&list=LL&index=3).

### Setting up the environment

#### 1. Requirements
- Vagrant 1.8.6 or later installed
- VirtualBox 5.1.6 or later installed

#### 2. Setup
- Ensure that you have Vagrant and VirtualBox installed
- Install the vagrant-hostupdater plugin - run this commanf from your terminal:  
`vagrant plugin install vagrant-hostsupdater`

#### 3. Download the VCCW .zip file
- [Download Link](http://vccw.cc)

#### 4. Create local development folder on your local machine
- Unzip the .zip file where you want to store the local website and then delete the .zip file
- This `vccw` folder will be where you store the local version of the website, so rename it to `local`. 

#### 5. Edit the default configuration
- Copy the `default.yml` file from the `provision` directory and paste it into your new `local` folder.
- Rename it from `default.yml` to `site.yml`
- Open `site.yml` 
- Change `hostname: vccw.test` to `hostname: [yourname]jazzclub.test`.  
- If you're on a Windows machine you will need to access and change your `hosts` file. To do this you will need to:  
  - Run Notepad as Administrator.
  - File -> Open -> `C:\Windows\System32\drivers\etc\hosts`. Make sure you're searching **all files** and not just text files.
  - Get your IP and hostname from `site.yml` and add to the bottom of the hosts file: 

    `192.168.33.10 [yourname]jazzclub.test jazzclub.test`  
    > Having the same hostname as somebody else seems to break `wordmove`. We believe it's because your hostname is your username when you SSH into the staging / production servers, and having the same username with multiple keys appears to cause issues. 

#### 6. Launch Vagrant
- Open a terminal on the folder you renamed earlier
- Run `vagrant up`. This only takes a couple minutes compared to the 20 minutes with VVV. You might have to enter your password.

#### 7. Visit the webpage
- Once it's finished installing you should be able to visit the page in your browser at `[yourname]jazzclub.test` or `192.168.33.10`.
- You can access the admin login page by adding `/wp-admin/` to the end of the URL.
- Unless you changed the details in the `site.yml` file, the default details are both `admin`.

#### Starting and stopping the VM
When you've finished working on the website, run `vagrant halt` or `vagrant suspend` from the terminal. When you want to work on the website again you need to run `vagrant up` again. It won't take as long as the first time. Don't forget to pull from GitHub before you start working, and don't forget to push your changes.

## Working with the staging/production environments

### Pushing and pulling the theme from GitHub
Once you have setup the local environment, open the `themes` directory in a new terminal window and paste in this command:  
`git clone https://github.com/cp3402-students/cp3402-2021-site-cp3402-2021-team05 jazzclub`  

### Pushing and pulling the WP site to staging (wordmove)

#### Initial `wordmove` setup
- Once you have setup the local environment, delete the `Movefile.yml`. 
- In your terminal run `vagrant ssh`. This will ssh you into the VM.
- Once you have SSH'd into the VM run `cd /var/www/html`, this will change your working directory to the WP folder. 
- In this directory run `wordmove init`. This will create a new `movefile.yml` file (for some reason I couldn't get wordmove to work with the existing `Movefile.yml` file that came with the VCCW installation, I had to do it this way in order for it to work
- Run `ls -lah` to double check that `movefile.yml` was created.
- Open this file in your editor and change it to match the following, **remembering to save the file** (you should be able to just copy and paste this except for making the `local vhost` match your hostname):   

```yaml
global:
  sql_adapter: default

local:
  vhost: http://jazzclub.test
  wordpress_path: /var/www/html # use an absolute path here

  database:
    name: wordpress
    user: wordpress
    password: "wordpress" # could be blank, so always use quotes around
    host: localhost

staging:
  vhost: http://13.54.147.239
  wordpress_path: /var/www/html # use an absolute path here

  database:
    name: wordpress
    user: wpadmin
    password: wpadminpass
    host: localhost

  exclude:
    - '.git/'
    - '.gitignore'
    - '.sass-cache/'
    - 'node_modules/'
    - 'bin/'
    - 'tmp/*'
    - 'Gemfile*'
    - 'Movefile'
    - 'movefile'
    - 'movefile.yml'
    - 'movefile.yaml'
    - 'wp-config.php'
    - 'wp-content/*.sql.gz'
    - '*.orig'

  ssh:
    host: 13.54.147.239
    user: ubuntu
    password: password # password is optional, will use public keys if available.
    port: 22 # Port is optional
    rsync_options: --verbose --itemize-changes# Additional rsync options, optional

production:
  vhost: http://3.106.143.211
  wordpress_path: /var/www/html # use an absolute path here

  database:
    name: wordpress
    user: wpadmin
    password: wpadminpass
    host: localhost

  exclude:
    - '.git/'
    - '.gitignore'
    - '.sass-cache/'
    - 'node_modules/'
    - 'bin/'
    - 'tmp/*'
    - 'Gemfile*'
    - 'Movefile'
    - 'movefile'
    - 'movefile.yml'
    - 'movefile.yaml'
    - 'wp-config.php'
    - 'wp-content/*.sql.gz'
    - '*.orig'

  ssh:
    host: 3.106.143.211
    user: ubuntu
    password: password # password is optional, will use public keys if available.
    port: 22 # Port is optional
    rsync_options: --verbose --itemize-changes# Additional rsync options, optional

```  
#### Sharing your public key with the staging / production servers
- Back in your terminal run `ssh-keygen`. This will generate your public and private keys to be shared with the AWS servers to gain access.
- Press enter at all the prompts untill you see your keys `randomart image`
- Run `ls -lah ~/.ssh/` to double check the keys were created. The output should look similiar to this:

```
drwx------  2 vagrant root    4.0K Apr 29 10:53 .
drwxr-xr-x 11 vagrant vagrant 4.0K Apr 29 10:47 ..
-rw-------  1 vagrant vagrant  389 Apr 29 10:07 authorized_keys
-rw-------  1 vagrant vagrant 1.7K Apr 29 10:53 id_rsa
-rw-r--r--  1 vagrant vagrant  398 Apr 29 10:53 id_rsa.pub
-rw-r--r--  1 vagrant vagrant  222 Apr 29 10:47 known_hosts
```
- Run `cat ~/.ssh/id_rsa.pub` to view your public key. At this point you can either copy this key into a plaintext file and send it to me ([Jack](https://github.com/JackMcKill)), and I can add it to the staging & production environment's lists of authorized keys for you, if you don't want mess around inside the staging server, **OR** you can ssh into the staging server yourself. If doing so yourself, make sure you are at least a little bit familiar with using [vim](https://www.linux.com/training-tutorials/vim-101-beginners-guide-vim/).
	- Download the `projectkeypair.pem` file to your computer (I will have to send this to you)
	- In the directory that it has been downloaded to, open a new terminal window/tab (but make sure you keep the exisiting one still open).
	- Run `chmod 400 projectkeypair.pem` to change the permissions, then run `ssh ubuntu@13.54.147.239 -i projectkeypair.pem`. This will ssh you into the **staging** server.
	- Jump back to the vagrant terminal window and copy the output from the `cat` command. Copy everything, including the `ssh-rsa` at the start and the `vagrant@jazzclub` at the end. Now jump back into the ssh terminal.
	- Once back inside the staging server ssh terminal, run `vim ~/.ssh/authorized_keys` to open the authorized_keys file in vim.
	- Use `shift` + `E` untill your curser reaches the end of the file.
	- Press `o` (lowercase letter o) to add a newline and enter `INSERT` mode
	- Paste your public key here
	- Once pasted press `ESC` and type `:wq` then hit enter. This saves your public key into the staging servers list of authorised keys.
	- Now run `exit` to close the ssh connection.
  - You can now repeat the steps for the **production** server, only this time the ssh command is `ssh ubuntu@3.106.143.211 -i projectkeypair.pem` (the staging and production servers use the same key `projectkeypair.pem` for ssh)
- Now you should be able to run `wordmove` succesfully

#### Running wordmove
You only need to do all the above steps once to setup the keys between your computer and the staging / production server. The wordmove syntax looks like:  

[`wordmove`] + [`push` or `pull`] + [`-d`] + [`-e`] + [`staging` or `production`]  
The `-d` flag means database, and the `-e` tells wordmove which environment to use. As an example, this is what it would look like if we were to push changes from our local environment to the staging server:  

`wordmove push -d -e staging`

[Wordmove's flag usage is explained in more detail here](https://github.com/welaika/wordmove/wiki/Usage-and-flags-explained).

To check that it's working properly:  

- Open `[yourname]jazzclub.test` and `http://13.54.147.239` side by side in 2 browser windows.  
- Run `wordmove pull -d -e staging` from inside your vagrant ssh terminal, making sure you're in the wordpress directory. If everything works, you should be able to refresh your `[yourname]jazzclub.test` browser page and see that your local copy of the site matches that of the staging environment.


## Example workflow
An example of how we will work collaboratively on the WP theme

1. Boot up the local environment  
	- Open up a terminal on your local development folder
	- Run `vagrant up`. Leave this terminal open the whole time you're working.
2. Once the local environment is up and running you need to pull any changes
	- Pull any changes from GitHub into our custom theme folder inside the `themes` directory. If you're working on a new feature/part of the theme checkout that feature branch, or create a new one and check it out if needed.
3. Make your changes  

4. Push your changes
	- If you only made changes to the theme, then you only need to push to github, either with `git push` in the terminal or from inside your editor
	- If you made changes to the content of the page as well, such as adding posts and pages, then you also need to push the changes to the staging site. If this is the case, inside the terminal run `vagrant ssh` to ssh into the VM
	- Navigate to the WP folder with `cd /var/www/html` and then run `wordmove push -d -e staging` to push to staging.
	- After the push has finished, check it worked on the staging website, and then run `exit` to close the ssh connection.
5. When you're done for the day save all your changes, push your changes to GitHub and run `vagrant halt` to turn off the VM
