'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  //Configurations will be loaded here.
  //Ask for user input
  prompting: function() {
    var done = this.async();
    this.prompt({
      type: 'input',
      name: 'name',
      message: 'Your project name',
      //Defaults to the project's folder name if the input is skipped
      default: this.appname
    }, function(answers) {
      this.props = answers;
      this.log(answers.name);
      done();
    }.bind(this));
  },
  //Writing Logic here
  writing: {
    //Copy the configuration files
    config: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath(this.props.name+'/'+'package.json'), {
          name: this.props.name
        }
      );
      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath(this.props.name+'/'+'README.md'), {
          name: this.props.name
        }
      );
      this.fs.copyTpl(
        this.templatePath('_Pertisk.sln'),
        this.destinationPath(this.props.name+'/'+this.props.name+'.sln'), {
          name: this.props.name
        }
      );
      this.fs.copy(
        this.templatePath('bitbucket-pipelines.yml'),
        this.destinationPath(this.props.name+'/'+'bitbucket-pipelines.yml')
      );

      this.fs.copy(
        this.templatePath('global.json'),
        this.destinationPath(this.props.name+'/'+'global.json')
      );
      this.fs.copy(
        this.templatePath('.gitattributes'),
        this.destinationPath(this.props.name+'/'+'.gitattributes')
      );
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath(this.props.name+'/'+'.gitignore')
      );
    },

    //Copy application files
    app: function() {

      //Test Projects
      this.fs.copyTpl(
        this.templatePath('test/Pertisk.DataAccess.UnitTests/_project.json'),
        this.destinationPath(this.props.name+'/'+'test/'+this.props.name+'.DataAccess.UnitTests/project.json'), {
          name: this.props.name
        }
      );

      this.fs.copyTpl(
        this.templatePath('test/Pertisk.Web.UnitTests/_project.json'),
        this.destinationPath(this.props.name+'/'+'test/'+this.props.name+'.Web.UnitTests/project.json'), {
          name: this.props.name
        }
      );

      //src files
      this.fs.copyTpl(
        this.templatePath('src/Pertisk.Api/_project.json'),
        this.destinationPath(this.props.name+'/'+'src/'+this.props.name+'.Api/project.json'), {
          name: this.props.name
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/Pertisk.Web/_project.json'),
        this.destinationPath(this.props.name+'/'+'src/'+this.props.name+'.Web/project.json'), {
          name: this.props.name
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/Pertisk.DataAccess/_project.json'),
        this.destinationPath(this.props.name+'/'+'src/'+this.props.name+'.DataAccess/project.json'), {
          name: this.props.name
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/Pertisk.Datas/_project.json'),
        this.destinationPath(this.props.name+'/'+'src/'+this.props.name+'.Datas/project.json'), {
          name: this.props.name
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/Pertisk.Intercepters/_project.json'),
        this.destinationPath(this.props.name+'/'+'src/'+this.props.name+'.Intercepters/project.json'), {
          name: this.props.name
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/Pertisk.MapAttibutes/_project.json'),
        this.destinationPath(this.props.name+'/'+'src/'+this.props.name+'.MapAttibutes/project.json'), {
          name: this.props.name
        }
      );

      return;
      //Server file
      this.fs.copyTpl(
        this.templatePath('_server.js'),
        this.destinationPath(this.props.name+'/'+'server.js'),
        this.destinationPath(this.props.name+'/'+'/views/index.ejs'), {
          name: this.props.name
        }
      );
      /////Routes
      this.fs.copy(
        this.templatePath('_routes/_all.js'),
        this.destinationPath(this.props.name+'/'+'routes/all.js'));


      // Model
      this.fs.copy(
        this.templatePath('_model/_todo.js'),
        this.destinationPath(this.props.name+'/'+'model/todo.js'));

      // Views
      this.fs.copyTpl(
        this.templatePath('_views/_index.ejs'),
        this.destinationPath(this.props.name+'/'+'/views/index.ejs'), {
          name: this.props.name
        }
      );

      // Public/
      this.fs.copy(
        this.templatePath('_public/_css/_app.css'),
        this.destinationPath(this.props.name+'/'+'public/css/app.css')
      );
      this.fs.copy(
        this.templatePath('_public/_js/_app.js'),
        this.destinationPath(this.props.name+'/'+'public/js/app.js')
      );
    }
  },
  install: function() {
    //this.installDependencies();
  }
});
