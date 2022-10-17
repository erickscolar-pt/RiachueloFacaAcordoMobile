import { Component, OnInit } from '@angular/core';
import { exceptionBg, mobileDefault, homeAlt } from 'src/app/shared/providers/background';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  public listaFaqs;
  public readonly bg = exceptionBg;
  public readonly bgMobile = mobileDefault;
  public bgAlt = homeAlt;

  constructor() {
    this.listaFaqs = [
      [
          {
          title: 'Como funciona a Faça Acordo',
          text: '<p>Faça Acordo é um PLATAFORMA de negociação de dívidas via internet, por meio da qual a Faça Acordo permite aos CLIENTES a possibilidade de negociar suas dívidas, com seus CREDORES.</p>'
        },
        {
          title: 'Quanto custa fazer um acordo pelo site da Faça Acordo?',
          text: '<p>Não te cobramos para fazer um acordo. A Faça Acordo é apenas um intermediador entre cliente inadimplente e credor</p>'
        },
        {
          title: 'Como eu faço um acordo? ',
          text: '<ul>'
              + '<li><p>A negociação pode ser feita através do nosso site. Possuímos também um suporte digital através das redes sociais (WhatsApp, Facebook, E-mail) e também um chat, todas as opções estão disponíveis no canto inferior direito.</p></li>'
              + '<li><p>O procedimento pelo site é:</p></li>'
              + '<li><p>Digite seu CPF;</p></li>'
              + '<li><p>Faça um cadastro inserindo seus dados como e-mail, telefone e data de nascimento;</p></li>'
              + '<li><p>Se você tiver dívidas com nossos parceiros, ela aparecerá para você após o cadastro;</p></li>'
              + '<li><p>Escolha a melhor forma de pagamento entre cartão de crédito ou boleto bancário;</p></li>'
              + '<li><p>Se tudo estiver conforme deseja é só fechar o acordo;</p></li>'
              + '<li><p>Para pagamentos com boleto, você pode baixar o boleto na hora, optar por receber via SMS a linha digitável ou receber o boleto em seu e-mail cadastrado. Verifique sempre sua caixa de spam;</p></li>'
              + '<li><p>Caso haja um parcelamento, as demais parcelas serão enviadas no e-mail cadastrado com 10 dias antes do vencimento de cada parcela;</p></li>'
              + '<li><p>Pague o boleto dentro da data de vencimento, pois após essa data não garantimos que seu acordo continuará válido. Caso seja cancelado, pode ser que você não encontre as mesmas condições novamente (desconto e parcelamento);</p></li>'
              + '<li><p>Pagamentos com boleto levam em média 72h para compensação;</p></li>'
              + '<li><p>Para pagamentos com cartão de crédito você precisa ter os dados do cartão como: Nome do titular, número do cartão, data de vencimento e código de segurança;</p></li>'
              + '</ul>'
        },
        {
          title: 'Não recebi meu boleto no e-mail cadastrado. O que devo fazer?',
          text: '<p><u><a href="http://facaacordo.com.br/login">Clique aqui</a></u> e faça login com os dados do seu cadastro. Após o cadastro selecione a empresa na qual tem um acordo aberto. A próxima página você terá opção de baixar a 2º via do boleto.</p>'
              + '<p><u><a href="http://vej.ae/l/atmatec">Clique Aqui</a></u> caso queira entrar em contato conosco.</p>'
        },
        {
          title: 'Quanto tempo para meu nome sair do SERASA/SPC?',
          text: '<p>De acordo com a lei, o prazo para que a empresa credora retire a negativação de seu nome do SPC/SERASA é de 5 (cinco) dias úteis, a contar do dia útil subsequente à quitação da primeira parcela do seu acordo ou total do débito, em caso de parcela única. Esse procedimento ocorre de forma automática pelo seu credor.</p>'
        }
      ],
      [
        {
          title: 'Quais empresas então disponíveis para fazer um acordo?',
          text: '<p>A Faça Acordo tem parceria com a Riachuelo e com a Midway financeira. Mas se seu credor não estiver na lista, você poderá deixar uma proposta em nosso site e quando o credor tiver parceria conosco, enviaremos uma notificação para você.</p>'
        },
        {
          title: 'Posso alterar meus dados cadastrais?',
          text: '<p>Basta acessar o link, fazer login com os dados originais do seu cadastro e alterar!</p>'
        },
        {
          title: 'Não gostei do acordo proposto. Posso fazer uma contraproposta?',
          text: '<p>Todos acordos disponibilizados no site facaacordo.com.br são oferecidos pelos credores com as melhores condições de descontos e parcelamentos. Dessa forma, infelizmente não conseguimos realizar negociações fora das previstas em nosso site.</p>'
        },
        {
          title: 'Como funciona o Chargeback?',
          text: '<p>Chargeback (ou contestação) é uma transação não reconhecida pelo verdadeiro titular do cartão. Nesse caso, a operadora devolve para o cliente o dinheiro que iria para sua conta.</p>'
              + '<p>Caso o CLIENTE tenha realizado o Chargeback sobre os valores envolvidos no pagamento após a realização do seu acordo, esses valores serão descontados e debitados da conta ou contrato do CLIENTE junto ao seu CREDOR, de forma que o valor do débito será corrigido conforme data original do débito, bem como haverá a reinclusão do nome do CLIENTE juntamente aos serviços de restrição ao crédito, entre os quais, o cadastro do Serviço Central de Proteção ao Crédito (SCPC) ou SERASA se assim já estava anterior ao Chargeback.</p>'
              + '<p>Caso o usuário não realize o pagamento correspondente ao Chargeback, o seu CREDOR  poderá:</p>'
              + '<p>a) Aplicar multa correspondente a 2% (dois por cento) do valor devido, além dos juros de mora de 1% (um por cento) ao mês;</p>'
              + '<p>b) Reencaminhar o débito do CLIENTE para assessorias de cobrança externas para negociação e/ou cobrança judicial ou extrajudicial;</p>'
              + '<p>Para contestar o Chargeback o CLIENTE  deverá reunir provas que endossem e confirmem seu relato. O fornecimento de tais documentos não garantirá a reversão da transação do pagamento do acordo.</p>'
              + '<p>Caso seja constatado que o Chargeback foi indevido, o CLIENTE ficará obrigado ao pagamento da transação correspondente ao pagamento da negociação realizada, sob pena da adoção, pelo CREDOR, das medidas judiciais ou extrajudiciais que entenda pertinentes para reaver os valores envolvidos na Transação objeto do Chargeback indevido.</p>'
        }
      ]
    ];
  }

  ngOnInit() {
  }

}
