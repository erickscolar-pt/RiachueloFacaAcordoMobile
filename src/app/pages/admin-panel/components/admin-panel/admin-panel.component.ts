import { Component, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import { UserService } from '../../providers/user.service';
import { MatTableDataSource, MatPaginator, MatDialog, PageEvent } from '@angular/material';
import { UserVO, DealByUser, User } from 'src/app/shared/providers/user/user';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';
import Swal from 'sweetalert2';
import { ExcelService } from 'src/app/shared/providers/excel/excel.service';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  public usersList: any[];
  public displayedColumns: string[] = ['active', 'admin', 'cpfOrCnpj', 'email', 'fullName', 'edit'];
  public dataSource;
  public dashForm: FormGroup;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 10;
  length = 100;
  pageIndex = 0;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() public dashSearch = new EventEmitter();

  constructor(
    private user: UserService,
    public dialog: MatDialog,
    private loading: LoadingService,
    private excel: ExcelService,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    this.loading.acessoClient("Tela ADMIN - Painel de relatorio",localStorage.getItem('cpf')).subscribe();

    this.dashForm = this.fb.group({
      date: new FormControl('', []),
    });

    this.user.get(this.pageSize, this.pageIndex)
      .subscribe(data => {
        this.usersList = data.content;
        this.pageIndex = data.pageIndex;
        this.length = data.totalElements;
        this.dataSource = new MatTableDataSource<UserVO>(this.usersList);
        this.paginator = data;
        this.dataSource.paginator = this.paginator;
      });
  }

  /* Campo de pesquisa */
  public search(){
    const date = this.dashForm.get('date').value;
    let inicio;
    let fim;
    let pageSize = 10;
    let pageIndex = 0;
    if (date && date.begin) {
      inicio = formatDate(date.begin, 'yyyy-MM-dd', 'pt');
    }
    if (date && date.end) {
      fim = formatDate(date.end, 'yyyy-MM-dd', 'pt');
    }
    this.user.get(pageSize, pageIndex, inicio, fim)
    .subscribe(data => {
      this.usersList = data.content;
      this.length = data.totalElements;
      this.dataSource = new MatTableDataSource<UserVO>(this.usersList);
      this.paginator = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  /* Relatorio excel user */
  public generateReport() {
    const date = this.dashForm.get('date').value;
    let inicio;
    let fim;
    if (date && date.begin) {
      inicio = formatDate(date.begin, 'yyyy-MM-dd', 'pt');
    }
    if (date && date.end) {
      fim = formatDate(date.end, 'yyyy-MM-dd', 'pt');
    }
    //console.log(inicio, fim)
    this.loading.setLoad();
    this.user.getUserReport(inicio, fim)
      .subscribe((usersList: UserVO[]) => {
        //console.log(usersList)
        const report = usersList.map(user => {
          const perfis : String = user.profile.map(perfil => perfil == 'ADMIN' ? 'Admin' : perfil == 'CLIENT' ? 'Cliente' : 'Admin Master').toString()
          return {
            id: user.id,
            cpfOrCnpj: user.cpfOrCnpj,
            nome: user.fullName,
            email: user.email,
            dataNascimento: user.birth,
            dataCadastro: user.dtRegister,
            fone: user.phone,
            perfis: perfis
          };
        });
        this.excel.exportAsExcelFile(report, `Relatório de usuários ${formatDate(new Date(), 'dd-MM-yyyy', 'pt')}`);
        this.loading.stopLoad();
      });
  }

  changePage(pageEvent: PageEvent) {
    const date = this.dashForm.get('date').value;
    let inicio;
    let fim;
    if (date && date.begin) {
      inicio = formatDate(date.begin, 'yyyy-MM-dd', 'pt');
    }
    if (date && date.end) {
      fim = formatDate(date.end, 'yyyy-MM-dd', 'pt');
    }
    this.user.get(pageEvent.pageSize, pageEvent.pageIndex, inicio, fim)
    .subscribe(data => {
      this.usersList = data.content;
      this.pageIndex = data.pageIndex;
      this.dataSource = new MatTableDataSource<UserVO>(this.usersList);
      this.paginator = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  public edit(user: UserVO) {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '65%',
      height: '80%',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }


  public slideIt(event, id) {
    let pageIndex = 0
    const isActive = event.checked ? 'adicionado ao grupo de administradores' : 'removido do grupo de administradores';
    this.loading.setLoad();
    this.user.patchAdmin(id)
      .subscribe({
        complete: () => {
          Swal.fire(
            'Sucesso',
            `Usuário ${isActive} com sucesso.`,
            'success'
          ).then(() => {

            this.user.get(this.pageSize, pageIndex)
            .subscribe(data => {
              this.usersList = data.content;
              this.length = data.totalElements;
              this.dataSource = new MatTableDataSource<UserVO>(this.usersList);
              this.paginator = data;
              this.dataSource.paginator = this.paginator;
            });
          });
          this.loading.stopLoad();
        },
        error: (err) => {
          this.loading.stopLoad();
          Swal.fire({
            type: 'error',
            title: 'Ops...',
            text: err,
          });
        }
      }
    );
  }

  public admin(event, id) {
    let pageIndex = 0;
    const isActive = event.checked ? 'ativado' : 'inativado';
    this.loading.setLoad();
    this.user.patchActivate(id)
      .subscribe({
        complete: () => {
          Swal.fire(
            'Sucesso',
            `Usuário ${isActive} com sucesso.`,
            'success'
          ).then(() => {
            this.user.get(this.pageSize, pageIndex)
            .subscribe(data => {
              this.usersList = data.content;
              this.length = data.totalElements;
              this.dataSource = new MatTableDataSource<UserVO>(this.usersList);
              this.paginator = data;
              this.dataSource.paginator = this.paginator;
            });
          });
          this.loading.stopLoad();
        },
        error: (err) => {
          this.loading.stopLoad();
          Swal.fire({
            type: 'error',
            title: 'Ops...',
            text: err,
          });
        }
      }
    );
  }

  public checkAdmin(profileList: any[]) {
    let isAdmin = false;
    profileList.map(profile => {
      if (profile === 'ADMIN_MASTER' || profile === 'ADMIN') {
        isAdmin =  true;
      }
    });

    return isAdmin;
  }

}
