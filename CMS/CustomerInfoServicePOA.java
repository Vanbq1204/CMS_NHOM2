package CMS;


/**
 * Generated from IDL interface "CustomerInfoService".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public abstract class CustomerInfoServicePOA
	extends org.omg.PortableServer.Servant
	implements org.omg.CORBA.portable.InvokeHandler, CMS.CustomerInfoServiceOperations
{
	static private final java.util.HashMap<String,Integer> m_opsHash = new java.util.HashMap<String,Integer>();
	static
	{
		m_opsHash.put ( "addCustomer", Integer.valueOf(0));
		m_opsHash.put ( "searchCustomer", Integer.valueOf(1));
		m_opsHash.put ( "getCustomer", Integer.valueOf(2));
		m_opsHash.put ( "getAllCustomer", Integer.valueOf(3));
	}
	private String[] ids = {"IDL:CMS/CustomerInfoService:1.0"};
	public CMS.CustomerInfoService _this()
	{
		org.omg.CORBA.Object __o = _this_object() ;
		CMS.CustomerInfoService __r = CMS.CustomerInfoServiceHelper.narrow(__o);
		return __r;
	}
	public CMS.CustomerInfoService _this(org.omg.CORBA.ORB orb)
	{
		org.omg.CORBA.Object __o = _this_object(orb) ;
		CMS.CustomerInfoService __r = CMS.CustomerInfoServiceHelper.narrow(__o);
		return __r;
	}
	public org.omg.CORBA.portable.OutputStream _invoke(String method, org.omg.CORBA.portable.InputStream _input, org.omg.CORBA.portable.ResponseHandler handler)
		throws org.omg.CORBA.SystemException
	{
		org.omg.CORBA.portable.OutputStream _out = null;
		// do something
		// quick lookup of operation
		java.lang.Integer opsIndex = (java.lang.Integer)m_opsHash.get ( method );
		if ( null == opsIndex )
			throw new org.omg.CORBA.BAD_OPERATION(method + " not found");
		switch ( opsIndex.intValue() )
		{
			case 0: // addCustomer
			{
				CMS.CustomerInfo _arg0=CMS.CustomerInfoHelper.read(_input);
				_out = handler.createReply();
				_out.write_boolean(addCustomer(_arg0));
				break;
			}
			case 1: // searchCustomer
			{
				java.lang.String _arg0=_input.read_string();
				_out = handler.createReply();
				CMS.CustomerInfoSeqHelper.write(_out,searchCustomer(_arg0));
				break;
			}
			case 2: // getCustomer
			{
				java.lang.String _arg0=_input.read_string();
				_out = handler.createReply();
				CMS.CustomerInfoHelper.write(_out,getCustomer(_arg0));
				break;
			}
			case 3: // getAllCustomer
			{
				_out = handler.createReply();
				CMS.CustomerInfoSeqHelper.write(_out,getAllCustomer());
				break;
			}
		}
		return _out;
	}

	public String[] _all_interfaces(org.omg.PortableServer.POA poa, byte[] obj_id)
	{
		return ids;
	}
}
